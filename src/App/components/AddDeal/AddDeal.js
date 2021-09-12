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
  const productsObj = useSelector(getProducts);
  const productsArray = productsObj.products === undefined ? [] : productsObj.products;

  const [productId, setProductId] = useState(0);
  const [applicationId, setApplicationId] = useState('');
  const [premium, setPremium] = useState('');

  const [selectPlaceholderText, setSelectPlaceholderText] = useState('Select a product');
  const [selectPlaceholderClass, setSelectPlaceholderClass] = useState('');

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  if (productsObj.status === 401) {
    return <Redirect to="/" />;
  }

  const resetForm = () => {
    setProductId(0);
    setApplicationId('');
    setPremium('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productId === 0) {
      setSelectPlaceholderText('Please select a Product');
      setSelectPlaceholderClass('red-text');
    } else {
      dispatch(createDeal({
        product_id: productId,
        application_id: applicationId,
        premium,
      }));
      resetForm();
    }
  };

  return (
    <>
      <AppBar title={appBarTitle} link="/track" />
      <div className="add-deal">
        <form onSubmit={handleSubmit}>
          <Select
            className="react-select"
            classNamePrefix="react-select"
            options={productsArray.map((p) => ({ label: p.product_name, value: p.id }))}
            onChange={(e) => setProductId(e.value)}
            placeholder={<div className={selectPlaceholderClass}>{selectPlaceholderText}</div>}
          />
          <input type="text" placeholder="Application ID" value={applicationId} onChange={(e) => setApplicationId(e.target.value)} />
          <input type="number" step="0.01" placeholder="Premium" value={premium} onChange={(e) => setPremium(e.target.value)} required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddDeal;
