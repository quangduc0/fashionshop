import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import { formatter } from '../../utils/fomater';

const ListProduct = () => {

    const [allproducts,setAllProducts] = useState([]);

    const fetchInfo = async ()=> {
      await fetch('http://localhost:4000/allproducts').then((res)=>res.json()).then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
      fetchInfo();
    },[])

    const remove_product = async (id)=>{
      await fetch('http://localhost:4000/removeproduct',{
        method: 'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify({id:id})
      })
      await fetchInfo();
    }

  return (
    <div className='listproduct'>
        <h1>Tất cả sản phẩm</h1>
        <div className="listproduct-format-main">
          <p>Sản phẩm</p>
          <p>Tiêu đề</p>
          <p>Giá cũ</p>
          <p>Giá mới</p>
          <p>Danh mục</p>
          <p>Xóa</p>
        </div>
        <div className="listproduct-allproducts">
          <hr />
            {allproducts.map((product,index)=>{
                return <>
                <div key={index} className="listproduct-format-main listproduct-format">
                    <img src={product.image} alt="" className="listproduct-product-icon" />
                    <p>{product.name}</p>
                    <p>{formatter(product.old_price)}</p>
                    <p>{formatter(product.new_price)}</p>
                    <p>{product.category}</p>
                    <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
                </div>
                <hr />
                </>
            })}
        </div>
    </div>
  )
}

export default ListProduct
