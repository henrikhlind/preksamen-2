'use client';

import { useState } from 'react';
import VoteModal from './VoteModal';

export default function VoteButton(props: any) {
  const [hideModal, setHideModal] = useState(true);

  return (
    <>
      <button className="bg-transparent border-2 border-gray-900 rounded-lg w-full py-2 px-4 text-gray-900 text-sm" onClick={() => setHideModal(false)}>
        Stem
      </button>
      <div className={`fixed left-0 top-0 w-screen h-screen bg-gray-900/10 z-10 backdrop-blur-sm ${hideModal ? 'hidden' : 'flex justify-center items-center'}`}>
        <div className={`z-10 ${hideModal ? 'hidden' : ''}`}>
          <VoteModal party={props.party} />
        </div>
        <div className="w-full h-full z-0 fixed" onClick={() => setHideModal(true)}></div>
      </div>
    </>
  );
}
