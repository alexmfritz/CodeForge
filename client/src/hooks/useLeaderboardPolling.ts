import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../features/store';
import { fetchLeaderboard, fetchHighlights } from '../features/leaderboardSlice';

const POLL_INTERVAL = 30_000;

export function useLeaderboardPolling() {
  const dispatch = useAppDispatch();
  const filterCohortId = useAppSelector((s) => s.leaderboard.filterCohortId);
  const filterPeriod = useAppSelector((s) => s.leaderboard.filterPeriod);
  const filterRef = useRef(filterCohortId);
  const periodRef = useRef(filterPeriod);
  filterRef.current = filterCohortId;
  periodRef.current = filterPeriod;

  useEffect(() => {
    // Initial fetch
    dispatch(fetchLeaderboard({ cohortId: filterCohortId, period: filterPeriod }));
    dispatch(fetchHighlights(filterCohortId));

    const interval = setInterval(() => {
      dispatch(fetchLeaderboard({ cohortId: filterRef.current, period: periodRef.current }));
      dispatch(fetchHighlights(filterRef.current));
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch, filterCohortId, filterPeriod]);
}
