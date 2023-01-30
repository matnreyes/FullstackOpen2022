interface TotalProps {
  total: number
}
const Total = ( props: TotalProps ) => {
  return (
    <div>
      Number of exercises {props.total}
    </div>
  );
};

export default Total;