// import langFr from '../assets/lang/fr.json';

// const __ = (key) => {
//     return (key in langFr) ? langFr[key] : key;
// }

type NotifTypeToTitleMapType = {
    [str: string]: {
        title: string,
    },
}

const notifTypeToTitleMap: NotifTypeToTitleMapType = {
    ContractSigninNotification: {
        title: 'Signature de contrat',
    },
    OrderCanceledNotification: {
        title: 'Commande annulée',
    },
    OrderInDeliveryNotification: {
        title: 'Commande en cours de livraison',
    },
    PaymentFailureNotification: {
        title: 'Echec du paiement',
    },
    PaymentSuccessNotification: {
        title: 'Success du paiement',
    },
    NewOrderNotifcation: {
        title: 'Nouvelle commande',
    },
    DocumentAddNotification: {
        title: 'Nouveau document ajouté',
    },
    ResetPasswordNotification: {
        title: 'Réinitialisation du mot de passe',

    },
    UserWelcomeNotification: {
        title: 'Bienvenu',
    },
}

const getNotificationTitle = (type: string): string => {
    let notifType = type;
    const seperator = '\\';

    if (notifType.includes(seperator)) {
        notifType = notifType.slice(
            notifType.lastIndexOf(seperator) + 1
        )
    }

    return notifTypeToTitleMap[notifType]?.title ?? type
};

export const String = {
    getNotificationTitle,
}