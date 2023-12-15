import React from 'react';
import classes from './styles.module.css';
import { paymentMethods } from '../constant';
import WireTransferOverlay from '../WireTransferOverlay';
import AddBitSafeOverlay from '../AddBitsafeOverlay';
import AchOverlay from '../AchOverlay';

interface TabProps {
  handleTabChange: (name: string) => void;
}
interface PaymentCardProps {
  heading: string;
  subHeading: string;
  points: string[];
  addDetailsHandler: (name: string) => void;
  cardName: string;
}

function PaymentCard(props: PaymentCardProps) {
  const { heading, subHeading, points, addDetailsHandler, cardName } = props;
  return (
    <div className={classes.card}>
      <div className={classes.cardHeaderWrapper}>
        <div className={classes.headingText}>{heading}</div>
        <div className={classes.subHeadingText}>{subHeading}</div>
      </div>
      <div className={classes.cardBody}>
        {points.map((point) => (
          <div className={classes.points} key={point}>
            {point}
          </div>
        ))}
      </div>
      <div className={classes.cardFooter}>
        <button
          className={classes.cardButton}
          type="button"
          onClick={() => addDetailsHandler(cardName)}
        >
          Add Details
        </button>
      </div>
    </div>
  );
}
function PaymentMethod(props: TabProps) {
  const { handleTabChange } = props;
  const [selectedCard, setSelectedCard] = React.useState('');
  const selectedCardChangeHandler = (name: string) => {
    setSelectedCard(name);
  };
  return (
    <div className={classes.withdrawalWrapper}>
      <div className={classes.navWrapper}>
        <div
          className={classes.homeText}
          onClick={() => handleTabChange('wallet')}
        >
          Wallet
        </div>
        <div>New Payout Method </div>
      </div>

      <div className={classes.cardListWrapper}>
        {paymentMethods.map((method) => {
          return (
            <PaymentCard
              heading={method.heading}
              subHeading={method.subHeading}
              points={method.points}
              cardName={method.cardName}
              addDetailsHandler={selectedCardChangeHandler}
            />
          );
        })}
      </div>
      {selectedCard === 'wireTransfer' && <WireTransferOverlay />}
      {selectedCard === 'bitSafe' && <AddBitSafeOverlay />}
      {selectedCard === 'ach' && <AchOverlay />}
    </div>
  );
}

export default PaymentMethod;
