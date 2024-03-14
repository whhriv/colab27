

    
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
        }
}

    //   console.log("About "+Math.round(durationSum/60)+" minutes");
        console.log(minuteSum+" minutes");
        console.log('ROUTE TIME:', durationSum);
    
    })
    .catch(error => {
        console.log(error("error fetching directions:", error))
    })
}


