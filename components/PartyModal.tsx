import { changeParty, authenticate } from '@/app/actions';
import { getSession } from '@/app/lib';
import { useFormState, useFormStatus } from 'react-dom';
import { useState, useEffect } from 'react';

const initialState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className={`bg-gray-900 rounded-lg p-2 px-3 text-white text-sm font-medium ${pending ? 'bg-opacity-80' : ''}`} type="submit" disabled={pending}>
      Lagre endring
    </button>
  );
}

export default function PartyModal(props: any) {
  const [editState, editFormAction] = useFormState(changeParty, initialState);
  const [authState, authFormAction] = useFormState(authenticate, initialState);
  const party = props.party;

  const [session, setSession] = useState(null);

  const [email, setEmail] = useState(party.epost);
  const [address, setAddress] = useState(party.adresse);
  const [postal, setPostal] = useState(party.postnr);

  useEffect(() => {
    const fetchSession = async () => {
      const result = await getSession();
      setSession(result);
    };

    fetchSession();
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 w-80 h-fit text-base">
      {session ? (
        <form className="flex flex-col gap-4" action={editFormAction}>
          <h1 className="text-lg">Rediger informasjon for {party.navn}</h1>
          <label htmlFor="email">E-post</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none"
            required
          />
          <label htmlFor="address">Kontaktadresse</label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none"
            required
          />
          <label htmlFor="postal">Postnummer</label>
          <input
            type="text"
            name="postal"
            id="postal"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none"
            required
          />
          <input type="text" name="id" value={party.id} className="hidden" readOnly />
          <SubmitButton /> <p>{editState.message}</p>
        </form>
      ) : (
        <form className="flex flex-col gap-4" action={authFormAction}>
          <h1 className="text-lg">Vennligst logg inn</h1>
          <label htmlFor="password">Passord</label>
          <input type="password" name="password" id="password" className="border rounded-lg p-2 focus:outline-none" required />
          <button className="bg-gray-900 rounded-lg p-2 px-3 text-white text-sm">Logg inn</button>
          <p>{authState.message}</p>
        </form>
      )}
    </div>
  );
}
