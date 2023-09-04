/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
    userDetails: any;
}
export default function MasterCard({userDetails}: Props) {
  return (
    <div>
        <div>
      <h6 className="p-2">Available Balance</h6>
      <h2 className="p-2">USD {userDetails.accountBalance}</h2>
      </div>
      <div className="p-2">
        {userDetails.cardNumber}
      </div>

      <div className="d-flex p-2 justify-content-between">
        <h6>{userDetails.fullname}</h6>
        <h6>{userDetails.cardexp}</h6>
      </div>
    </div>
  )
}