import { vote } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import kommuner from '@/public/data/kommuner.json';

const initialState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className={`bg-gray-900 rounded-lg p-2 px-3 text-white text-sm font-medium ${pending ? 'bg-opacity-80' : ''}`} type="submit" disabled={pending}>
      Send stemme
    </button>
  );
}

function checkValidPersonNr(personNr: string) {
  if (personNr.length === 11 && !isNaN(Number(personNr))) {
    let nrs = personNr.split('').map(Number);
    let k1 = 11 - ((3 * nrs[0] + 7 * nrs[1] + 6 * nrs[2] + 1 * nrs[3] + 8 * nrs[4] + 9 * nrs[5] + 4 * nrs[6] + 5 * nrs[7] + 2 * nrs[8]) % 11);
    let k2 = 11 - ((5 * nrs[0] + 4 * nrs[1] + 3 * nrs[2] + 2 * nrs[3] + 7 * nrs[4] + 6 * nrs[5] + 5 * nrs[6] + 4 * nrs[7] + 3 * nrs[8] + 2 * k1) % 11);

    if (k1 === 11) k1 = 0;
    if (k2 === 11) k2 = 0;

    return k1 < 10 && k2 < 10 && k1 == nrs[9] && k2 == nrs[10] ? true : false;
  }
}

export default function VoteModal(props: any) {
  const [state, formAction] = useFormState(vote, initialState);
  const party = props.party;

  return (
    <div className="bg-white rounded-lg p-4 w-80 h-fit text-base">
      <form className="flex flex-col gap-4" action={formAction}>
        <h1 className="text-lg">Legg inn stemme for {party.navn}</h1>
        <label htmlFor="personnr">Ditt fødselsnummer</label>
        <input className="border rounded-lg p-2 focus:outline-none" type="text" name="personnr" id="personnr" />
        <label htmlFor="email">Din kommune</label>
        <select className="border rounded-lg p-2 " name="kommune">
          {kommuner.map((kommune: any) => (
            <option key={kommune} value={kommune}>
              {kommune}
            </option>
          ))}
        </select>
        <input type="text" name="id" value={party.id} className="hidden" readOnly />
        <SubmitButton /> <p>{state.message}</p>
      </form>
    </div>
  );
}
