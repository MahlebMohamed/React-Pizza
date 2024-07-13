import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  function handleDeleteItem() {
    console.log(pizzaId);
    dispatch(deleteItem(pizzaId));
  }

  return (
    <Button onClick={handleDeleteItem} type="small">
      Delete
    </Button>
  );
}
