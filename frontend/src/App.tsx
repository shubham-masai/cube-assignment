import React from 'react';
import Sidebar from './components/Sidebar';
import MainBody from './components/MainBody';

const App: React.FC = () => {
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<string | null>(null);

  const handleSelectedCustomer = (id: string) => {
    setSelectedCustomerId(id);
  }

  return (
    <div className='app-container'>
      <Sidebar handleSelectedCustomer={handleSelectedCustomer} />
      <MainBody selectedCustomerId={selectedCustomerId} />
    </div>
  );
}

export default App;
