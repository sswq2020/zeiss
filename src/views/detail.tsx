import { defineComponent,ref,onMounted } from "vue";
import { useRoute } from "vue-router";

type MacheStatus = "running" | "finished" | "errored" | "repaired" | "idle"

type MacheEvent = {
    timestamp:string;
    status:MacheStatus
}

type MacheItem =  {
    "status": MacheStatus,
    "machine_type": "microscope" | "measurement",
    "longitude": number,
    "latitude": number,
    "last_maintenance": string,
    "install_date": string,
    "id": string,
    "floor": number,
    "events":MacheEvent[]
}

const specialColor = {
    color: 'hsla(160, 100%, 37%, 1)'
}

export default defineComponent({ 
    setup(){
        const route = useRoute();
        const {id} = route.params
        const macheDeatil = ref<MacheItem>(Object.create(null));
        const fetchDeail = async()=>{
            return fetch(`/api/v1/machines/${id}`,{
                method:'get',
                headers:{
                   'content-type': 'application/json'
                }
            }).then(res=>{
                return res.json()
            })
            .catch(err=>{
                console.log(err);
            })
        }

        onMounted(async ()=>{
          const res = await fetchDeail();
           macheDeatil.value = res.data;
        })

        return ()=> (
           <>
              <h3>MacheId ---- {macheDeatil.value.id}</h3>
              <h3>Install Time---- {macheDeatil.value.install_date}</h3>
              <h3>Status ---- {macheDeatil.value.status}</h3>
              <h3>Past Event</h3>
              <ul>
                {macheDeatil.value.events && Array.isArray(macheDeatil.value.events) && macheDeatil.value.events.map((item,index)=>(
                    <li><span>{item.timestamp.replace('T','-').replace('Z','')}</span> push status <span>{item.status}</span></li>
                ))}
              </ul>
           </>
        )
    }
})