import { useSelector } from 'react-redux';

export default function contracttable() {
  const { staff, user, publicholidays } = useSelector(
    (state) => ({
      staff: state.calendar.staff,
      user: state.calendar.user,
      publicholidays: state.calendar.publicholidays,,
    }),
  );
  return <div>Enter</div>;
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      data: null,
    },
  };
}
