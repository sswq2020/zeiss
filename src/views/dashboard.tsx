import { defineComponent,ref,onMounted } from "vue";
import { useRouter } from "vue-router";

type MacheItem =  {
    "status": "running" | "finished" | "errored",
    "machine_type": "microscope" | "measurement",
    "longitude": number,
    "latitude": number,
    "last_maintenance": string,
    "install_date": string,
    "id": string,
    "floor": number
}

const specialColor = {
    color: 'hsla(160, 100%, 37%, 1)'
}

export default defineComponent({

    setup(){
        const router = useRouter()
        const list = ref<MacheItem[]>([]);
        const fetchList = async()=>{
            return fetch('/api/v1/machines',{
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
          const res = await fetchList();
          list.value = res.data;
        })

        const jump = (item:MacheItem) =>{
           console.log(item.id);
           router.push(`/detail/${item.id}`)
        }

        return ()=> (
           <>
             <ul>
                 {list.value.map((item,index) => (
                    <li>Machine_Id ---- <span onClick={()=>jump(item)} style={specialColor}>{item.id}</span> ----status---- <span>{item.status}</span>  </li>
                    ))}
             </ul>
           </>
        )
    }
})