import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../features/store';
import { fetchLeaderboard, fetchHighlights } from '../features/leaderboardSlice';

const POLL_INTERVAL = 30_000;

export function useLeaderboardPolling() {
  const dispatch = useAppDispatch();
  const filterCohortId = useAppSelector((s) => s.leaderboard.filterCohortId);
  const filterRef = useRef(filterCohortId);
  filterRef.current = filterCohortId;

  useEffect(() => {
    // Initial fetch
    dispatch(fetchLeaderboard(filterCohortId));
    dispatch(fetchHighlights(filterCohortId));

    const interval = setInterval(() => {
      dispatch(fetchLeaderboard(filterRef.current));
      dispatch(fetchHighlights(filterRef.current));
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch, filterCohortId]);
}
