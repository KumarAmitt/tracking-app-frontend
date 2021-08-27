import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import AppBar from './AppBar';
import { getProducts, loadProducts } from '../../store/slicers/product';
import { createDeal } from '../../store/slicers/deal';
import { getSessionInfo, loadSession } from '../../store/slicers/user_session';
import './style/AddDeal.css';

const AddDeal = () => {
  const appBarTitle = 'Add Deal';
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const sessionInfo = useSelector(getSessionInfo);
  const [dealInfo, setDealInfo] = useState({ productId: 0, applicationId: '', premium: '' });

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadSession());
  }, []);

  const handleChange = (e) => {
    setDealInfo({ ...dealInfo, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    setDealInfo({ ...dealInfo, productId: e });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dealInfo.productId === 0) {
      const el = document.getElementById('select-placeholder');
      el.innerHTML = 'Product must be selected';
      el.style.color = 'red';
    } else {
      // console.log(dealInfo);
      dispatch(createDeal({
        product_id: dealInfo.productId,
        application_id: dealInfo.applicationId,
        premium: dealInfo.premium,
      }));
      setDealInfo({
        ...dealInfo, productId: 0, applicationId: '', premium: '',
      });
    }
  };

  if (!sessionInfo.logged_in) {
    return <Redirect to="/" />;
  }

  // console.log(products);
  return (
    <>
      <AppBar title={appBarTitle} link="/track" />
      <div className="add-deal">
        <form onSubmit={handleSubmit}>
          <Select
            className="react-select"
            classNamePrefix="react-select"
            options={products.map((p) => ({ label: p.product_name, value: p.id }))}
            onChange={(e) => handleSelect(e.value)}
            placeholder={<div id="select-placeholder">Select a product</div>}
          />
          <input type="text" name="applicationId" placeholder="Application ID" value={dealInfo.applicationId} onChange={handleChange} />
          <input type="number" step="0.01" name="premium" placeholder="Premium" value={dealInfo.premium} onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddDeal;
