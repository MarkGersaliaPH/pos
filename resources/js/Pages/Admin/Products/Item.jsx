import Card, { CardBody, CardHeader } from '@/Components/Card';
import { useDrag } from 'react-dnd';

export default function Item ({ item }){
  const [, drag] = useDrag({
    type: 'ITEM',
    item: { id: item.id, name: item.name },
  });

  return (
    <div ref={drag} className='cursor-move '  >
      <div className="mb-2 border p-2 m-2 bg-slate-50 flex-shrink-0">   {item.name}<br></br>
        Original Price: {item.normal_price}<br></br>
        Selling Price: {item.selling_price} 
      </div>
    </div>
  );
};