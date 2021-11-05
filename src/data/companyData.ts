type CompanyArray = {
  company: string;
  product: string;
  price: string;
  description: string;
  image: string;
}[];

const companyData: CompanyArray = [
  {
    company: "A Company",
    product: "Fine Shoes",
    price: "3000",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "",
  },
  {
    company: "B Inc.",
    product: "tail shoes",
    price: "2500",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "",
  },
  {
    company: "B inc.",
    product: "Nice shirts",
    price: "2600",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "",
  },
];

export { companyData };
