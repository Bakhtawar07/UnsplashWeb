import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '/pages/photos/pol.module.css'

const clientId = "9OArSFu6_bQX8RNi71wLFN_pj9yhZLK5dLuP_KuvAOM"

const PhotoDetaill = () => {
    const [photo, setPhoto] = useState("");
    const router = useRouter()
    //const {user, name, id, description} = photo

    useEffect(() => {
        const { id, photoData } = router.query
        photoData && setPhoto(JSON.parse(photoData))
        id && !photoData && fetchResults(id)
    }, [router.query])

    const fetchResults = (id) => {
        const url = `https://api.unsplash.com/photos/${id}?client_id=${clientId}`;
        try {
            axios.get(url)
                .then((response) => {
                    console.log("API Response",response.data)
                    setPhoto(response.data)
                })
        }
        catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {

                console.log(error.request);
            } else {

                console.log('Error', error.message);
            }
            console.log(error);
        }
    }


    return (
        <>
            <div className={styles.polaroid}>
            <img src={photo.urls?.thumb} style={{width: "100%"}}  />
            <div className={styles.container}>
            <p>{photo.alt_description}</p>
            <p>{photo.description}</p>
            <p>Color code: {photo.color}</p>
            <p>Image id is: {photo?.id} </p>
            
            </div>
            
            
            </div>
            
        </>
    )
}

export default PhotoDetaill




