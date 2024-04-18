import { useState } from 'react';
import {UseFormRegisterReturn} from "react-hook-form";

interface ProductQuantityProps {
  name: string;
  productQuantity: number;
  setProductQuantity: React.Dispatch<React.SetStateAction<number>>;
  age: string;
  max: number;
  title: string;
  total: number;
  image?: string;
  scale: string;
  props: UseFormRegisterReturn
}

const ProductQuantity = (data: ProductQuantityProps) => {

  let style = "p-5 scale-" + data.scale
  const decreaseQuantity = () => {
    if (data.productQuantity > 0) {
      data.setProductQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (data.total < data.max) {
      data.setProductQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  return (
    <div>
      <div className=' p-3 bg-[#ECF0F1] items-center border rounded-2xl shadow-lg shadow-black/80'>
        <div className='  '>
          <img src={data.image} className={style} />
        </div>

        <div className=' font-semibold '> {data.title}</div>

        <div className='  '> {data.age}</div>

        <div className=" ">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={data.productQuantity === 0}
            className="size-10 leading-10 text-gray-600 transition hover:opacity-75 text-2xl"
          >
            -
          </button>
          <input
              {...data.props}
            disabled={true}
           name={data.name}
            type="number"
            id={data.name}
            value={data.productQuantity}
            onChange={(e) => data.setProductQuantity(parseInt(e.target.value))}
            className="h-10 w-16 rounded border-gray-200 text-center sm:text-sm appearance-none"
          />
          <button
            type="button"
            onClick={increaseQuantity}
            className="size-10 leading-10 text-gray-600 transition hover:opacity-75 text-2xl"
          >
            +
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductQuantity;
