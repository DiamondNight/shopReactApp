/* eslint-disable react/prop-types */
import { Card } from "primereact/card";
import { Button } from "primereact/button";

export default function ProductCard(props) {
  // eslint-disable-next-line react/prop-types
  const { product } = props;
  const price = product.price - (product.price * product.discount) / 100;
  const header = (
    <div className="overflow-hidden">
      <img
        alt="Card"
        className="bg-contain max-w-20rem max-h-25rem"
        src={product.image_url}
      />
    </div>
  );
  const footer = (
    <div className="flex justify-content-center">
      <Button label="Add To Cart" icon="pi pi-cart-plus" />
    </div>
  );
  const subTitle = (
    <p className="m-0" style={{ fontSize: "1.5rem" }}>
      {price}
      <i className="pi pi-euro" />
    </p>
  );
  return (
    <div className="card text-center">
      <Card
        title={product.product_name}
        subTitle={subTitle}
        footer={footer}
        header={header}
        className="md:w-20rem"
      >
        <div className="flex flex-column">
          <p className="m-1">Alcohol (% Vol) : {product.description.alc_vol}</p>
          <p className="m-1">Location : {product.description.location}</p>
        </div>
      </Card>
    </div>
  );
}
