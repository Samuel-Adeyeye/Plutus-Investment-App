/* eslint-disable @typescript-eslint/no-explicit-any */
import mastercardlogo from './logos/mastercard.svg'
import mastercardchip from './logos/chip.png'
// import { userDetails } from '../Routes';


interface Props {
  userDetails: any;
}


export default function MasterCard({ userDetails }: Props) {
  return (
    <div className=" flex flex-col bg-orange-500 rounded-l-3xl rounded-r-3xl lg:w-[30rem] text-left p-10 sm:max-lg:w-fit" >
      <div className="flex justify-between">
        <img
          src={mastercardlogo}
          alt=""
          className='w-2/12'
        />
        <img
          src={mastercardchip}
          alt=""
          className='w-2/12'
        />
      </div>
      <div className=''>
        <h6 className="p-2 text-xs">Available Balance</h6>
        <h2 className="p-2">
          NGN <span className="pl-2">{userDetails?.accountBalance || ''}</span>
        </h2>
      </div>
      <div className="p-2">{userDetails?.cardNumber || 'XXXX XXXX XXXX XXXX'}</div>

      <div className="flex p-2 justify-between">
        <h6>{`${userDetails?.firstName} ${userDetails?.lastName}`|| ''}`</h6>
        <h6>{userDetails?.cardexp || 'exp-date'}</h6>
      </div>
    </div>
  );
}
