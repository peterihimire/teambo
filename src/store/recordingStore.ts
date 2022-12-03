import create, { SetState, GetState }  from "zustand";
import { getLocalRecordings, getSingleRecording } from "../services/recordingService";




const initialState = {
   
    
        localRecordings: { loading: true, recordings: []},
      
        singleLocalRecording: {loading: true},
  };
  

interface recordingStoreType {
  
    localRecordings: Record<string, any>,
    singleLocalRecording: any,
    getLocalRecordings: (type: string) => void;
    getSingleLocalRecording: (id: string) => void;
    fetchingLocalRecording: () => void;
}

export const recordingStore = create<recordingStoreType>(
    (set: SetState<recordingStoreType>, get: GetState<recordingStoreType>) => ({
      ...initialState,
      fetchingLocalRecording: () => (
        set((prevState) => ({
          ...prevState,
          localRecordings: { loading: true}
        }))
      ),
      getLocalRecordings: async (type: string) => {

        await get().fetchingLocalRecording();
        try{
          let recordings = await getLocalRecordings(type);
          set((prevState) => ({
              ...prevState,
              localRecordings: {loading: false, recordings: [...recordings.data]}
            }));
        }
        catch(err) {
          set((prevState) => ({
            ...prevState,
            localRecordings: {loading: false, error: true}
          }));
        }
       
      },
      getSingleLocalRecording: async (id: string) => {
       
       
        try {
          let recording = await getSingleRecording(id);
          set((prevState) => ({
            ...prevState,
            singleLocalRecording: {...recording.data, loading: false}
          }));

        }
        catch(e) {
          set((prevState) => ({
            ...prevState,
            singleLocalRecording: {error: true, loading: false}
          }));

        }
        
      },
    })
  );
export default recordingStore;
