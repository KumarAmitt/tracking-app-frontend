import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from './AppBar';
import { getProgressReport, getTotalPremium, loadDeals } from '../../store/slicers/deal';

const Progress = () => {
  const title = 'Progress Report';
  const dispatch = useDispatch();
  const target = 600000;
  const totalPremium = useSelector(getTotalPremium);
  const progressReport = useSelector(getProgressReport);

  useEffect(() => {
    dispatch(loadDeals());
  }, []);

  console.log(totalPremium);
  console.log(progressReport);

  Object.entries(progressReport).forEach((p) => {
    console.log(p[0], p[1].map((e) => e.premium).reduce((a, b) => a + b));
  });

  return (
    <>
      <AppBar title={title} />
      <div>
        <div>
          Achieved:
          {totalPremium}
        </div>
        <div>
          Lagging:
          {target - totalPremium}
        </div>
        <div>
          Target:
          {target}
        </div>
      </div>
      <hr />
      <div>
        {
          Object.entries(progressReport).map((p) => (
            <div key={p[0]}>
              <div>{p[0]}</div>
              <div>{p[1].map((e) => e.premium).reduce((a, b) => a + b)}</div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Progress;

// const Progress = () => {
//   const title = 'Progress Report';
//   const dispatch = useDispatch();
//   // const target = 600000;
//   const totalPremium = useSelector(getTotalPremium);
//   const progressReport = useSelector(getProgressReport);
//
//   useEffect(() => {
//     dispatch(loadDeals());
//   }, []);
//
//   console.log(totalPremium);
//   console.log(progressReport);
//
//   // Object.entries(progressReport).forEach((p) => {
//   //   console.log(p[0], p[1].map((e) => e.premium).reduce((a, b) => a + b));
//   // });
//
//   return (
//     <>
//       <AppBar title={title} />
//     </>
//   );
// };

// export default Progress;
