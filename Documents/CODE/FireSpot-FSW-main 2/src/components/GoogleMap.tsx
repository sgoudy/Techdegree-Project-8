import apiKey from "../config";

export function Map(props:object) {
    var centerLong:string = "37.773972"; // currently for san fran but we should change this with props
    var centerLat:string = "-122.431297"
    var url:string = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${centerLong}, ${centerLat}&zoom=18&maptype=satellite`;
    return (
        <iframe
        title="map"
        width="100%"
        height="800px"
        frameBorder="0"
        src={url} allowFullScreen>
        </iframe>
    );
}