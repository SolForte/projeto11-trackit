import { ThreeDots } from "react-loader-spinner";
export default function Loading() {
  return (
    <ThreeDots
      height="13"
      width="100%"
      radius="9"
      color="#FFFFFF"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
}