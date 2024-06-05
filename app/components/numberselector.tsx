import Image from "next/image";

interface ProductQuantityProps {
  productQuantity: number;
  setProductQuantity: React.Dispatch<React.SetStateAction<number>>;
  age: string;
  max: number;
  title: string;
  total: number;
  image: string;
  scale: string;

}

const ProductQuantity: React.FC<ProductQuantityProps> = ({ productQuantity, setProductQuantity, age, title, max, total, image, scale }) => {

  let style = "p-5 scale-" + scale
  const decreaseQuantity = () => {
    if (productQuantity > 0) {
      setProductQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (total < max) {
      setProductQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  return (
    <div>
      <div className=' p-3 bg-[#ECF0F1] items-center border rounded-2xl shadow-lg shadow-black/80'>
        <div className='  '>
          <img src={image} className={style} alt="Number selector of transfer price" />
        </div>

        <div className=' font-semibold '> {title}</div>

        <div className='  '> {age}</div>

        <div className=" ">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={productQuantity === 0}
            className="size-10 leading-10 text-gray-600 transition hover:opacity-75 text-2xl"
          >
            -
          </button>
          <input
            disabled={true}
            type="number"
            id="Quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(parseInt(e.target.value))}
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
