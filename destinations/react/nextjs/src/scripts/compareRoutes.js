

    
export async function getRouteTime(start, end, directionsService){

  directionsService.route({

            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,

    })
    .then((res) => {

        let durationSum=0;
        let minuteSum=0;

        for(let i=0;i<res.routes.length;i++){
        for(let j=0; j< res.routes[i].legs.length;j++){
            durationSum= durationSum+res.routes[i].legs[j].duration.value;
            minuteSum= minuteSum+Math.ceil(res.routes[i].legs[j].duration.value/60);
            sessionStorage.setItem(`TIME${i + 1}`, JSON.stringify(res.routes[i].legs[j].duration.value));
            console.log(`TIME-loop${[i]}`, sessionStorage.getItem(`TIME${i + 1}`));
            // for (let k = 0; k < res.routes.length; k++) {
            //     sessionStorage.setItem(`TIME${k + 1}`, JSON.stringify(responses[k].request.origin));
            //     console.log('TIME-loop', sessionStorage.getItem(`TIME${k + 1}`));
            //   }
        }
}

    //   console.log("About "+Math.round(durationSum/60)+" minutes");
        console.log(minuteSum+" minutes");
        console.log('ROUTE TIME:', durationSum);
        // console.log(TIME1)
    
    })
    .catch(error => {
        console.log(error("error fetching directions:", error))
    })
}


