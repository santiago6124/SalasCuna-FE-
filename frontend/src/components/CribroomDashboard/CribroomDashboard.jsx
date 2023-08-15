import "../CribroomDashboard.css"

import { getAllCribrooms, getAllShifts, getAllZones } from "../../api/salasCuna.api"


export function CribroomDashboard() {
    const [cribrooms, setCribrooms] = useState([]);
    const [zoneOptions, setZoneOptions] = useState([]);
    const [shiftOptions, setShiftOptions] = useState([]);
    const [selectedCribroom, setSelectedCribroom] = useState('');

    useEffect(() => {
        ListCribroom();
      }, []);

    const ListCribroom = async () => {
        try {
          const response = await getAllCribrooms();
          setCribrooms(response.data);
        } catch (error) {
          console.log('Error fetching SalasCunas:', error);
        }
      };
      
    const ListShift = async () => {
        try {
          const response = await getAllShifts();
          setShiftOptions(response.data);
        } catch (error) {
          console.log('Error fetching Shifts:', error);
        }
      };

    const ListZone = async () => {
        try {
          const response = await getAllZones();
          setZoneOptions(response.data);
        } catch (error) {
          console.log('Error fetching Zones:', error);
        }
    };

    const handleEdit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const payload = {
            name: formData.get("nameCR"),
            code: formData.get("codeCR"),
            max_capacity: formData.get("max_capacityCR"),
            street: formData.get("streetCR"),
            house_number: formData.get("house_numberCR"),
            shift: formData.get("shiftCR"),
            zone: formData.get("zoneCR"),
        };

        if(selectedCribroom){
            try {
                let response = await fetch('http://127.0.0.1:8000/api/cribroom/'+ selectedCribroom +'/', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                });
    
                if (response.ok){
                    console.log('Cribroom Updated')
                } else {
                    console.log('Failed to Update')
                }
    
            } catch (err) {
                alert(err)
            }
        }
    }

    const handleDelete = async (event) => {
      event.preventDefault()

      if(selectedCribroom){
        try {
          let response = await fetch("http://127.0.0.1:8000/api/cribroom/" + selectedCribroom + "/", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
          });
        } catch (err) {
          alert("Error al eliminar la sala cuna");
        }
      }
    };

    const handleCribroomChange = async (event) => {
        setSelectedCribroom(event.target.value);
    }


    return(
        <div className="cribroom-dashboard"></div>
    )
}