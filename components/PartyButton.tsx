'use client';

import PartyModal from './PartyModal';
import { useState } from 'react';

export default function PartyButton(props: any) {
  const [hideModal, setHideModal] = useState(true);

  return (
    <div>
      <button className="bg-gray-900 rounded-lg w-full py-2 px-4 text-white text-sm font-medium" onClick={() => setHideModal(false)}>
        Rediger{' '}
      </button>
      <div className={`fixed left-0 top-0 w-screen h-screen bg-gray-900/10 z-10 backdrop-blur-sm ${hideModal ? 'hidden' : 'flex justify-center items-center'}`}>
        <div className={`z-10 ${hideModal ? 'hidden' : ''}`}>
          <PartyModal party={props.party} />
        </div>
        <div className="w-full h-full z-0 fixed" onClick={() => setHideModal(true)}></div>
      </div>
    </div>
  );
}
