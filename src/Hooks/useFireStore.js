import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timeStamp } from "../Firebase/config";
let initailState = {
        document: null,
        isLoading: false,
        error: null,
        success: null,
};

const firestoreReducer = (state, action) => {
        switch (action.type) {
                case "IS_LOADING":
                        return {
                                isLoading: true,
                                document: null,
                                error: null,
                                success: false,
                        };
                case "ADDED_DOCUMENT":
                        return {
                                isLoading: false,
                                document: action.payload,
                                success: true,
                                error: null,
                        };
                case "DELETED_DOCUMENT":
                        return {
                                isLoading: false,
                                document: null,
                                success: true,
                                error: null,
                        };
                case "UPDATED_DOCUMENT":
                        return {
                                isPending: false,
                                document: action.payload,
                                success: true,
                                error: null,
                        };
                case "ERROR":
                        return {
                                document: null,
                                isLoading: false,
                                success: false,
                                error: action.payload,
                        };
                default:
                        return state;
        }
};
export const useFirestore = (collection) => {
        const [response, dispatch] = useReducer(firestoreReducer, initailState);
        const [isCancelled, setIsCancelled] = useState(false);

        //collection Ref
        const ref = projectFirestore.collection(collection);

        //dispatch if isCancelled not true
        const dispatchIfNotCancelled = (action) => {
                if (!isCancelled) {
                        dispatch(action);
                }
        };

        //add a Document
        const addDocument = async (doc) => {
                dispatch({ type: "IS_LOADING" });
                try {
                        const createdAt = timeStamp.fromDate(new Date());
                        const addedDocument = await ref.add({ ...doc, createdAt });
                        dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument });
                } catch (err) {
                        dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
                }
        };
        //delete a document
        const delDocument = async (id) => {
                dispatchIfNotCancelled({ type: "IS_LOADING" });
                try {
                        await ref.doc(id).delete();
                        dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
                } catch (err) {
                        dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
                }
        };
        //Update documents
        const updateDocument = async (id, updates) => {
                dispatch({ type: "IS_PENDING" });
                try {
                        const updatedDocument = await ref.doc(id).update(updates);
                        dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDocument });
                        // return updatedDocument;
                } catch (err) {
                        dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
                }
        };
        useEffect(() => {
                return () => setIsCancelled(true);
        }, []);

        return { addDocument, delDocument, updateDocument, response };
};
