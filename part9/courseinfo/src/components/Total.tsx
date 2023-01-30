interface TotalProps {
  total: number
}
const Total = ( props: TotalProps ) => {
  return (
    <div>
      Total: {props.total}
    </div>
  );
};

export default Total;