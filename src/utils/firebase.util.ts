import {initializeApp} from 'firebase/app';
import {collection, getFirestore, onSnapshot, QuerySnapshot,} from 'firebase/firestore';
import {CollectionReference, DocumentData} from '@firebase/firestore';
import {Messaggio, MessaggioOrdinato} from 'models/messaggi';
import {tokenUtils} from './token.utils';

const getFirebaseConfig = () => {
    return {
        authDomain: 'padel-69d4a.firebaseapp.com',
        databaseURL: 'https://padel-69d4a-default-rtdb.europe-west1.firebasedatabase.app',
        projectId: 'padel-69d4a'
    };
}

const readCollection = (collectionName: string): CollectionReference<DocumentData> => {
    const firebaseConfig = getFirebaseConfig();

    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app);

    return collection(db, collectionName);
}

export const readChat = (userId: number, callback: (snapshot: QuerySnapshot<DocumentData>) => void) => {
    const myId = tokenUtils.getPayload().sub
    const chatName = myId < userId ? myId + '_' + userId : userId + '_' + myId;

    console.log('chatName', chatName);
    console.log('userId', userId);
    console.log('myId', myId);

    const chat = readCollection(chatName);
    return onSnapshot(chat, callback)
}

export const mapReadChat = (userId: number, setMessaggi: (messaggi: MessaggioOrdinato[]) => void, callback?: () => void)  => {

    readChat(userId, (snapshot) => {
        if (callback) callback();

        const messaggi: Messaggio[] = snapshot.docs.map(doc => doc.data()).map(data => {
            return {
                sender: data.sender,
                receiver: data.receiver,
                message: data.message,
                time: new Date(data.time)
            }
        });
        const msgs = messaggi.sort((a, b) => a.time.getTime() - b.time.getTime());
        setMessaggi(mapMsgs(msgs));
    })
}

const mapMsgs = (msgs: Messaggio[]): MessaggioOrdinato[] => {
    const msgsOrdinati: MessaggioOrdinato[] = [];
    for (let i = 0; i < msgs.length; i++) {
        if (i === 0 || (i > 0 && msgs[i].sender.id !== msgs[i - 1].sender.id)) {
            msgsOrdinati[i] = {
                user: msgs[i].sender,
                time: msgs[i].time,
                messages: [msgs[i].message]
            }
            continue;
        }

        if (msgs[i].sender.id === msgs[i - 1].sender.id) {
            msgsOrdinati[msgsOrdinati.length - 1].messages.push(msgs[i].message);
        }
    }

    return msgsOrdinati;
}