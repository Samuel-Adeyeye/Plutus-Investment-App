import atmCard from "./images/atmCard.jpeg";
import penCard from "./images/penCoin.jpeg";
import arrow from "./images/arrow_forward.png";

const About = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row ">
        <div className="text-center md:text-start">
          <h1 className="text-3xl font-bold">Personalize your credit card</h1>
          <p className="mt-3">
            Create your design or choose from a number of amazing and unique
            existing designs. With our personalized credit cards, you can choose
            from a variety of designs and add your own photos or artwork to make
            your card truly one-of-a-kind. You can also select the rewards
            program that best suits your spending habits and earn points or
            cashback on every purchase.
          </p>
          <button className="flex w-44 mt-10 pr-12">
            <p>Learn more</p>
            <img src={arrow} className="h-6 w-6" />
          </button>
        </div>
        <div className="lg:ml-40">
          <img src={atmCard} alt="" className=" rounded-lg " />
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row mt-20">
        <div className="">
          <img src={penCard} className="h-[100%] w-[90%] rounded-lg " />
        </div>

        <div className="lg:pl-10 text-center md:text-start">
          <h1 className="text-3xl font-bold">Investment made simple</h1>
          <p className="mt-3">
            Our financial advisors are here to guide you through the investment
            process, helping you select the best options for your goals and risk
            tolerance. We offer a wide variety of investment products, including
            mutual funds, ETFs, stocks and bonds, so you can build a diversified
            portfolio that suits your needs
          </p>
          <button className="flex w-44 mt-10 pr-12">
            <p>Learn more</p>
            <img src={arrow} className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;

//  <div className=''>

//  <div className="flex flex-col md:flex-row items-center ml-30 md:items-start space-y-4 md:space-y-40 md:space-x-10 justify-around">
//        <div className="">
//        <div className="text">
//             <h3 className="text-2xl pt-40 font-bold">Personalize your credit card</h3>
//             <p className="text-gray-600 mt-2">Create your design or choose from a number of amazing and unique existing designs. <br/>
//              With our personalized credit cards, you can choose from a variety of designs and add your own photos <br />
//               or artwork to make your card truly one-of-a-kind. You can also select the rewards program that best suits <br/>
//                your spending habits and earn points or cashback on every purchase.</p>
//         </div>
//         <div className="pendtext">
//                  <p className="text-blue-500 cursor-pointer">learn more</p>
//         </div>
//        </div>

//         <div className="w-48 md:w-auto">
//             <img src={atmCard} alt="An ATM Card" className="w-full rounded-lg shadow-md" />
//          </div>
//         </div>

//     <div className="second"></div>
//     <div className= "text">
//     <h3>Investment made simple</h3>
//     <p>Our financial advisors are here to guide you through<br/> the investment process,
//     helping you select the best options for your<br/> goals and risk tolerance. We offer a wide variety of investment <br/>
//     products, including mutual funds, ETFs, stocks and bonds, so you<br/> can build a diversified portfolio that suits your needs</p>
//     </div>
//     <div className= "endtext">
//       <h3>learn more</h3>
//     </div>
//      <div className='arrow'>
//        <img src="images/penCoin.jpeg" alt="an image of coin, paper notes and a pain"/>
//     </div>
//     <div className='image'>
//         <img src="" alt=""/>
//     </div>
// </div>

/* <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-10">
            <div className="text">
                <h3 className="text-2xl font-bold">Personalize your credit card</h3>
                <p className="text-gray-600 mt-2">Create your design or choose from a number of amazing and unique existing designs. <br/>
                 With our personalized credit cards, you can choose from a variety of designs and add your own photos <br />
                  or artwork to make your card truly one-of-a-kind. You can also select the rewards program that best suits <br/>
                   your spending habits and earn points or cashback on every purchase.</p>
            </div>
            <div className="pendtext">
                <p className="text-blue-500 cursor-pointer">learn more</p>
            </div>
            <div className="w-48 md:w-auto">
                <img src={atmCard} alt="An ATM Card" className="w-full rounded-lg shadow-md" />
             </div>
            </div> */

{
  /* <div className="first">
            <div className="text">
                <h3>Personalize your credit card</h3>
                <p>Create your design or choose from number of amazing and unique<br/>
                existing designs. With our personalized credit cards, you can choose<br/>
                from a variety of designs and add your own photos or artwork to<br/>
                make your card truly one-of-a-kind. You can also select the rewards<br/>
                program that best suits your spending habits and earn points or<br/>
                cashback on every purchase.</p>
            </div>
            <div className='pendtext'>
                <p>learn more</p>
            </div>
            <div className="">
                <img src="images/atmCard.jpeg" alt="An ATM Card" />
            </div>
        </div> */
}
