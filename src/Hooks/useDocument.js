import { useEffect, useState } from "react";
import { projectFirestore } from "../Firebase/config";

export const useDocument = (collection, id) => {
        const [document, setDocuemnt] = useState("");
        const [error, setError] = useState("");

        //realtime data for document
        useEffect(() => {
                const ref = projectFirestore.collection(collection).doc(id);
                const unsubscribe = ref.onSnapshot(
                        (snapshot) => {
                                if (snapshot.data()) {
                                        setDocuemnt({ ...snapshot.data(), id: snapshot.id });
                                        setError(null);
                                } else {
                                        setError("oops That's an Error");
                                }
                        },
                        (err) => {
                                console.log(err.message);
                                setError(err);
                        },
                );
                return () => unsubscribe();
        }, [collection, id]);
        return { document, error };
};
