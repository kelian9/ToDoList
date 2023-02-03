import Directions from '@models/enums/Directions';
import TickerStates from '@models/enums/TickerStates';
import React, { useEffect, useRef, useState } from 'react';
import useAsyncState from '../../../utils/useAsyncState';
import styles from './style.module.scss';

interface NewsTickerPropsType {
	rowHeight: number;
	children: React.ReactNode[];
	maxRows: number;
	speed: number;
	duration: number;
	direction: Directions;
	autoStart: boolean;
	pauseOnHover?: boolean;
	className?: string;
	style: any;
	id: string;
	hasMoved?: () => void;
	movingUp?: () => void;
	beforeFinished?: () => void;
	started?: () => void;
	paused?: () => void;
}

const NewsTicker: React.FC<NewsTickerPropsType> = ({
	rowHeight,
	children,
	maxRows,
	speed: speedProp,
	duration,
	autoStart = false,
	style,
	id,
	hasMoved,
	movingUp,
	beforeFinished,
	started,
	paused: onPaused,
}) => {
	const [speed, setSpeed] = useState<number>(speedProp);
	const [currState, setCurrState] = useState<number>(TickerStates.Stopped);
	const [paused, setPaused] = useState<number>(0);
	const [moving, setMoving] = useAsyncState(0);
	const intervalTimerRef = useRef<number>();
	const [items, setItems] = useAsyncState((Array.isArray(children) && children) || [children]);
	const movedCountRef = useRef(0);

	const element = useRef<HTMLUListElement>(null);

	const checkSpeed = () => {
		if (duration < speed + 25) setSpeed(duration - 25);
	};

	const pause = async () => {
		if (!paused) {
			await setPaused(() => 1);
			onPaused && onPaused();
		}
	};

	const _handleUpAnimation = async (newList: React.ReactNode[]) => {
		if (!element || !element.current) return;
		const firsLiEl = element.current.children[0] as HTMLElement;

		// First element will go up rowHeight px in speed ms
		window.setTimeout(() => {
			firsLiEl.style.cssText = `margin: -${rowHeight}px 0 0 0; transition: all ${speedProp}ms;`;
		}, 0);
		// Wait for speed ms and send first element to end of the list.
		// After that get first list element back to margin 0.
		await new Promise((resolve) =>
			window.setTimeout(() => {
				newList.shift();
				firsLiEl.style.cssText = 'margin: 0';
				resolve(newList);
			}, speedProp)
		);

		await setItems((prev: any[]) => {
			const pushed = [...prev];
			pushed.push(prev[0]);
			return pushed.slice(1);
		});
	};

	const moveUp = async () => {
		if (paused || moving) return;
		if (movedCountRef.current + 1 === Array.from(items as any[]).length && beforeFinished) {
			beforeFinished();
			await pause();
			await setMoving(0);
			return;
		}

		await setMoving(() => 1);
		movingUp && movingUp();
		const itemsCopy = [...(items as React.ReactNode[])];
		itemsCopy.push(itemsCopy[0]);

		await _handleUpAnimation(itemsCopy);

		await setMoving(() => 0);
		movedCountRef.current = movedCountRef.current + 1;
		hasMoved && hasMoved();
	};

	const resetInterval = (currentState: TickerStates) => {
		if (!currentState) return;
		window.clearInterval(intervalTimerRef.current);
		intervalTimerRef.current = window.setInterval(() => {
			moveUp();
		}, duration);
	};

	const start = async () => {
		if (currState) return;

		setCurrState(1);
		await setItems((Array.isArray(children) && children) || [children]);
		resetInterval(1);
		started && started();
	};

	const init = () => {
		if (!element || !element.current) {
			return;
		}
		element.current.style.height = `${rowHeight * maxRows}px`;
		element.current.style.overflow = 'hidden';
		checkSpeed();
		if (autoStart) start();
	};

	useEffect(() => {
		setMoving(0);
		setPaused(0);
		movedCountRef.current = 0;
		init();
		return () => {
			if (intervalTimerRef.current) window.clearInterval(intervalTimerRef.current);
		};
	}, []);

	return (
		<ul ref={element} id={id} className={styles.container} style={style}>
			{(items as React.ReactNode[]).map((item, index) => (
				<li key={index} className={styles.article}>
					{item}
				</li>
			))}
		</ul>
	);
};

export default NewsTicker;
