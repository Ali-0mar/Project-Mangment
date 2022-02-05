import { useRef, useEffect, useState } from "react";
import { projectFirestore } from "../Firebase/config";
export const useCollection = (collection, _query, _orderBy) => {
        const [documents, setDocuments] = useState(null);
        const [error, setError] = useState(null);

        //If we used query as a dependecy we will get cought up in an infinite loop because query is an array
        //and arrays are reference type data so after every rerender it will be different
        const query = useRef(_query).current;
        const orderBy = useRef(_orderBy).current;
        useEffect(() => {
                let ref = projectFirestore.collection(collection);
                if (query) {
                        ref = ref.where(...query);
                }
                if (orderBy) {
                        ref = ref.orderBy(...orderBy);
                }
                const unsubscribe = ref.onSnapshot(
                        (snapshot) => {
                                let results = [];
                                snapshot.docs.forEach((doc) => {
                                        results.push({ ...doc.data(), id: doc.id });
                                });
                                //update the State
                                setDocuments(results);
                                setError(null);
                        },
                        (error) => {
                                console.log(error);
                                setError("couldn;t fetch data");
                        },
                );
                return () => unsubscribe();
        }, [collection, query, orderBy]);

        return { documents, error };
};
