
// let video = (arr) => {

//     const fetchVideoData = (video_id, index) => {
//         fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video_id}&key=${api_key}`)
//             .then(response => {
//                 return response.json();
//             })
//             .then(data => {
//                 console.log(data.items[0]);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     };

//     for (let J = 0; J < arr.length; J++) {
//         let video_id = arr[J];
//         fetchVideoData(video_id, J);
//     }
// };
// `https://www.googleapis.com/youtube/v3/search?part=snippet&statistics&channelId=${youtube}&key=${api_key}&maxResults=1&order=date`
// `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${youtube}&key=${api_key}`
// video(arr);


// const video_id = "t36CMEd_iXc";
// let testing = () => {
//     fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&statistics&id=${video_id}&key=${api_key}`)
//         .then(response => {
//             return response.json();
//         })
//         .then(data => {
//             const videoDuration = data.items[0].contentDetails.duration;
//             const durationInMilliseconds = parseYouTubeDurationToMilliseconds(videoDuration);
//             // console.log(data.items[0].contentDetails.duration)
//             if (durationInMilliseconds > 180000 || durationInMilliseconds < 3600000) {
//                 console.log("It is more than 3 minutes");
//                 console.log(videoDuration);
//             } else {
//                 console.log("value is not ablicable")
//             }
//         })
// };

// testing()



const api_key = "AIzaSyBYAY_7xeW6iANNfROzgKxjovKrQYwCdCg";
// const youtube = "UCwiCyswBHPe50z7yGkDSDqw";
var durationFilter = 'long';
var arr = [];

function handleChannelSelect() {
    const selectElement = document.getElementById("channelSelect");
    const selectedChannelID = selectElement.value;
    youtube = selectedChannelID; // Update youtube variable with the selected channel ID
}

// Add an event listener to the select element to detect changes
document.getElementById("channelSelect").addEventListener("change", handleChannelSelect);

const date = document.querySelector(".date")
const pdate = document.querySelector(".publicDate")
let ids = async () => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${youtube}&key=${api_key}&maxResults=20&order=date`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            arr = []
            const today = new Date();
            // const cutoffDate = new Date("2023-06-14T11:18:56Z");
            // console.log(data)
            for (var i = 0; i < data.items.length; i++) {
                // arr.push(data.items[i].id.videoId)
                if (data.items[i].snippet.publishedAt > today.getFullYear() + "-" + 0 + today.getMonth() + "-" + today.getDay()  /*>pdate.value*/ + "T11:18:56Z") {
                    arr.push(data.items[i].id.videoId)
                }
            }
            // console.log(arr)
            return arr;
        });
};

date.addEventListener('click', () => {

    ids(handleChannelSelect())

})



function parseYouTubeDurationToMilliseconds(duration) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = duration.match(regex);

    const hours = parseInt(matches[1] || 0);
    const minutes = parseInt(matches[2] || 0);
    const seconds = parseInt(matches[3] || 0);

    const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000;
    return totalMilliseconds;
}



var last_arr = []
const press = document.querySelector("button");

// press.addEventListener("click", () => {
//     let video = (arr) => {
//         const fetchVideoData = (video_id, index) => {
//             fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&statistics&id=${video_id}&key=${api_key}`)
//                 .then(response => {
//                     return response.json();
//                 })
//                 .then(data => {
//                     const videoDuration = data.items[0].contentDetails.duration;
//                     const durationInMilliseconds = parseYouTubeDurationToMilliseconds(videoDuration);
//                     // console.log(data);
//                     // data.items[0].contentDetails.duration < "P59M" ||
//                     if (durationInMilliseconds > 90000 && durationInMilliseconds < 3600000) {
//                         // The duration is greater than 3 minutes and less than 1 hour
//                         console.log("Video duration isless than1 hour.");
//                         console.log(data.items[0].contentDetails.duration)
//                         last_arr.push(data.items[0].id)
//                     }
//                     else {
//                         // The duration is either less than 3 minutes or greater than or equal to 1 hour
//                         console.log("Video duration is not within the specified range.");
//                         console.log(data.items[0].contentDetails.duration)
//                     }
//                     console.log(data.items[0].contentDetails.duration)
//                     return last_arr;
//                 })
//                 .catch(error => {
//                     console.error(error);
//                 });
//         };
//         for (let J = 0; J < arr.length; J++) {
//             let video_id = arr[J];
//             fetchVideoData(video_id, J);
//         }
//     };
//     // video(arr);
//     setTimeout(video(arr), 1000);
// })



let video = (arr) => {
    const fetchVideoData = (video_id, index) => {
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&statistics&id=${video_id}&key=${api_key}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const videoDuration = data.items[0].contentDetails.duration;
                const durationInMilliseconds = parseYouTubeDurationToMilliseconds(videoDuration);
                // console.log(data);
                // data.items[0].contentDetails.duration < "P59M" ||
                if (durationInMilliseconds > 90000 && durationInMilliseconds < 3600000) {
                    // The duration is greater than 3 minutes and less than 1 hour
                    // console.log("Video duration isless than1 hour.");
                    // console.log(data.items[0].contentDetails.duration)
                    last_arr.push(data.items[0].id)
                }
                else {
                    // The duration is either less than 3 minutes or greater than or equal to 1 hour
                    // console.log("Video duration is not within the specified range.");
                    // console.log(data.items[0].contentDetails.duration)
                }
                // console.log(data.items[0].contentDetails.duration)
                return last_arr;
            })
            .catch(error => {
                console.error(error);
            });
    };
    for (let J = 0; J < arr.length; J++) {
        let video_id = arr[J];
        fetchVideoData(video_id, J);
    }
};

// setTimeout(() => {
//     video(arr)
// }, 10000);
const getId = document.querySelector(".GetId")

getId.addEventListener("click", () => {
    video(arr)
})




// const test = document.querySelector(".test")

// test.addEventListener("click", () => {
//     console.log(last_arr)
// })


const avg = document.querySelector(".avg")



avg.addEventListener("click", () => {
    const fetchVideoData = async (video_id) => {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video_id}&key=${api_key}`);
            const data = await response.json();
            const views_f = parseInt(data.items[0].statistics.viewCount);
            return views_f;
        } catch (error) {
            console.error(error);
            return 0;
        }
    };

    const calculateAverageViews = async (videoIds) => {
        let totalViews = 0;

        for (let i = 0; i < videoIds.length; i++) {
            const video_id = videoIds[i];
            const views = await fetchVideoData(video_id);
            totalViews += views;
        }

        const averageViews = totalViews / videoIds.length;
        const average = document.createElement("h1")
        document.body.appendChild(average);
        average.innerHTML = Math.round(averageViews);
    };

    calculateAverageViews(last_arr);
});
