/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
    userDetails: any;
}
export default function CheckingAccount({userDetails}: Props) {
  return (
    <div>
      <div className="d-flex p-2 justify-content-between">
        <h6>Checking Account</h6>
        <h6>^2.36%</h6>
      </div>

      <div className="d-flex flex-column p-2">
        <h6>Balance</h6>
        <h2>USD {userDetails.accountBalance}</h2>
        <h6>Available</h6>
        <h4>USD {userDetails.accountBalance}</h4>
      </div>

      <div className="d-flex p-2 justify-content-between">
        <div>
            <h6>Income</h6>
            <h5>USD {userDetails.accountBalance}</h5>     
        </div>
        <div>
            <h6>Expenses</h6>
            <h5>USD {userDetails.accountBalance}</h5>     
        </div>
        
      </div>
    </div>
  )
}