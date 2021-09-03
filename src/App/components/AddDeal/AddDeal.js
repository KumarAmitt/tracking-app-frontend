import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import { getProducts, loadProducts } from '../../../store/slicers/product';
import { createDeal } from '../../../store/slicers/deal';
import './style/AddDeal.css';

const AddDeal = () => {
  const appBarTitle = 'Add Deal';
  const dispatch = useDispatch();
  const products = useSelector(getProducts);

  const [productId, setProductId] = useState(0);
  const [applicationId, setApplicationId] = useState('');
  const [premium, setPremium] = useState('');

  const changeApplicationId = (e) => {
    setApplicationId(e.target.value);
  };

  const changePremium = (e) => {
    setPremium(e.target.value);
  };

  const changeProductId = (e) => {
    setProductId(e);
  };

  const resetForm = () => {
    setProductId(0);
    setApplicationId('');
    setPremium('');
  };

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productId === 0) {
      const el = document.getElementById('select-placeholder');
      el.innerHTML = 'Product must be selected';
      el.style.color = 'red';
    } else {
      dispatch(createDeal({
        product_id: productId,
        application_id: applicationId,
        premium,
      }));
      resetForm();
    }
  };

  // if (!sessionInfo.logged_in) {
  //   return <Redirect to="/" />;
  // }

  return (
    <>
      <AppBar title={appBarTitle} link="/track" />
      <div className="add-deal">
        <form onSubmit={handleSubmit}>
          <Select
            className="react-select"
            classNamePrefix="react-select"
            options={products.map((p) => ({ label: p.product_name, value: p.id }))}
            onChange={(e) => changeProductId(e.value)}
            placeholder={<div id="select-placeholder">Select a product</div>}
          />
          <input type="text" placeholder="Application ID" value={applicationId} onChange={changeApplicationId} />
          <input type="number" step="0.01" placeholder="Premium" value={premium} onChange={changePremium} required />
          <button type="submit" data-testid="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddDeal;
