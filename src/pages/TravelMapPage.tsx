import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Navigation } from "lucide-react";
import L from "leaflet";
import { MapContainer, Marker, Polygon, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import { Link, useLocation } from "react-router-dom";
import { destinations } from "../data/destinations";

const tourismPoints = [
  {
    name: "Chinhoyi Caves",
    category: "Caves",
    coordinates: { lat: -17.3567, lng: 30.1247 },
    activities: ["Blue pool viewing", "Cave photography", "Day trip stop"]
  },
  {
    name: "Mana Pools National Park",
    category: "Wildlife",
    coordinates: { lat: -15.819, lng: 29.374 },
    activities: ["Wildlife viewing", "Zambezi scenery", "Guided safari"]
  },
  {
    name: "Matobo National Park",
    category: "Heritage & Wildlife",
    coordinates: { lat: -20.533, lng: 28.5 },
    activities: ["Rock formations", "Rhino tracking", "Cultural heritage"]
  },
  {
    name: "Gonarezhou National Park",
    category: "Wildlife",
    coordinates: { lat: -21.65, lng: 31.73 },
    activities: ["Elephants", "Chilojo Cliffs", "Remote safari"]
  },
  {
    name: "Chimanimani National Park",
    category: "Mountains",
    coordinates: { lat: -19.8, lng: 32.86 },
    activities: ["Mountain hiking", "Waterfalls", "Scenic walking"]
  },
  {
    name: "Domboshava Caves",
    category: "Culture",
    coordinates: { lat: -17.608, lng: 31.14 },
    activities: ["Rock art", "Short hike", "Sunset viewpoint"]
  },
  {
    name: "Balancing Rocks",
    category: "Scenic",
    coordinates: { lat: -17.842, lng: 31.113 },
    activities: ["Photography", "Rock formations", "Harare stop"]
  },
  {
    name: "Mutarazi Falls",
    category: "Waterfall",
    coordinates: { lat: -18.495, lng: 32.82 },
    activities: ["Waterfall viewing", "Skywalk", "Nyanga day trip"]
  },
  {
    name: "Kuimba Shiri Bird Park",
    category: "Birdlife",
    coordinates: { lat: -17.911, lng: 30.763 },
    activities: ["Bird displays", "Photography", "Lake Chivero day trip"]
  }
];

type TourismPoint = (typeof tourismPoints)[number];
type Destination = (typeof destinations)[number];
type MapPageState = {
  selectedDestinationSlug?: string;
  selectedTourismPointName?: string;
};

const ZIMBABWE_CENTER: [number, number] = [-19.0154, 29.1549];
const ZIMBABWE_BOUNDS: [[number, number], [number, number]] = [[-22.4, 25], [-15.3, 33.4]];
const zimbabweBounds = L.latLngBounds(ZIMBABWE_BOUNDS);
const ZIMBABWE_BORDER: [number, number][] = [
  [-17.79411, 25.25978],
  [-17.83214, 25.31590],
  [-17.84124, 25.37647],
  [-17.85488, 25.49558],
  [-17.86232, 25.51646],
  [-17.84868, 25.53682],
  [-17.81147, 25.68141],
  [-17.83938, 25.74383],
  [-17.87266, 25.79468],
  [-17.92381, 25.86362],
  [-17.95999, 25.85349],
  [-18.00050, 25.96697],
  [-17.97849, 26.04056],
  [-17.96236, 26.08118],
  [-17.94190, 26.09420],
  [-17.93157, 26.11859],
  [-17.91358, 26.16748],
  [-17.88630, 26.22112],
  [-17.91017, 26.23920],
  [-17.92278, 26.30380],
  [-17.93601, 26.32550],
  [-17.97931, 26.48549],
  [-18.00288, 26.57024],
  [-18.04122, 26.61272],
  [-18.06923, 26.70000],
  [-18.03296, 26.75359],
  [-17.98459, 26.88826],
  [-17.96474, 26.95916],
  [-17.94428, 27.04846],
  [-17.84248, 27.14902],
  [-17.78387, 27.14695],
  [-17.41511, 27.52429],
  [-17.23331, 27.62486],
  [-16.95964, 27.81689],
  [-16.82755, 28.11392],
  [-16.56875, 28.64329],
  [-16.55811, 28.73285],
  [-16.51522, 28.76928],
  [-16.43460, 28.82912],
  [-16.36546, 28.85703],
  [-16.28474, 28.84029],
  [-16.16278, 28.85248],
  [-16.08217, 28.86850],
  [-16.06047, 28.85724],
  [-16.02202, 28.87718],
  [-15.95724, 28.94686],
  [-15.95060, 29.01805],
  [-15.89541, 29.07634],
  [-15.85934, 29.12172],
  [-15.81283, 29.18631],
  [-15.70359, 29.50846],
  [-15.65574, 29.58722],
  [-15.66659, 29.64851],
  [-15.63806, 29.77325],
  [-15.61884, 29.88177],
  [-15.64013, 30.05024],
  [-15.63217, 30.16992],
  [-15.64974, 30.22315],
  [-15.62886, 30.25488],
  [-15.65243, 30.32805],
  [-15.71682, 30.39771],
  [-16.00124, 30.40257],
  [-15.99887, 30.74973],
  [-16.03452, 30.94217],
  [-16.06429, 30.98977],
  [-16.02491, 31.04222],
  [-16.02553, 31.07333],
  [-15.99690, 31.11410],
  [-16.03029, 31.27890],
  [-16.09282, 31.32835],
  [-16.12372, 31.37026],
  [-16.14883, 31.38401],
  [-16.14728, 31.39961],
  [-16.15937, 31.40271],
  [-16.16495, 31.44571],
  [-16.19648, 31.51919],
  [-16.23978, 31.73820],
  [-16.34076, 31.86005],
  [-16.40628, 31.88563],
  [-16.44494, 32.01415],
  [-16.49176, 32.39366],
  [-16.60989, 32.68310],
  [-16.68678, 32.69866],
  [-16.70880, 32.73131],
  [-16.69547, 32.76935],
  [-16.71242, 32.89337],
  [-16.68306, 32.95621],
  [-16.81577, 32.93337],
  [-16.93514, 32.82878],
  [-17.10950, 32.92851],
  [-17.26611, 32.96909],
  [-17.31775, 32.98360],
  [-17.34556, 33.02163],
  [-17.38399, 33.01165],
  [-17.48622, 32.95166],
  [-17.50937, 32.93668],
  [-17.56456, 32.96913],
  [-17.61923, 33.02453],
  [-17.71391, 33.00024],
  [-17.81064, 32.97357],
  [-17.85550, 32.93967],
  [-17.92257, 32.95027],
  [-17.95999, 32.94040],
  [-17.98231, 32.92898],
  [-18.02458, 32.93492],
  [-18.18333, 32.97554],
  [-18.22540, 32.95817],
  [-18.25630, 32.95497],
  [-18.33289, 33.03496],
  [-18.38394, 33.00923],
  [-18.42228, 32.98680],
  [-18.46714, 32.99641],
  [-18.50104, 32.93714],
  [-18.52212, 32.88314],
  [-18.57318, 32.87167],
  [-18.69317, 32.92231],
  [-18.77451, 32.90252],
  [-18.78702, 32.81792],
  [-18.84324, 32.68987],
  [-18.91983, 32.71576],
  [-18.94267, 32.68253],
  [-18.98825, 32.69028],
  [-19.02225, 32.69897],
  [-19.01770, 32.78599],
  [-19.02835, 32.81999],
  [-19.05915, 32.83022],
  [-19.08374, 32.85591],
  [-19.26668, 32.83219],
  [-19.32342, 32.80614],
  [-19.40279, 32.76852],
  [-19.47586, 32.77395],
  [-19.47917, 32.82536],
  [-19.59162, 32.82536],
  [-19.62366, 32.82960],
  [-19.65208, 32.81627],
  [-19.68908, 32.84914],
  [-19.65528, 32.92458],
  [-19.67906, 32.96241],
  [-19.75140, 32.97905],
  [-19.78417, 33.03280],
  [-19.86809, 33.02132],
  [-20.02426, 33.00437],
  [-20.04152, 32.94009],
  [-20.09112, 32.91068],
  [-20.15169, 32.87787],
  [-20.20058, 32.85710],
  [-20.22889, 32.86557],
  [-20.28667, 32.84521],
  [-20.47177, 32.70444],
  [-20.56479, 32.60367],
  [-20.60303, 32.48161],
  [-20.79423, 32.48347],
  [-20.98016, 32.46766],
  [-21.14284, 32.34534],
  [-21.16362, 32.37335],
  [-21.17219, 32.38054],
  [-21.18791, 32.37175],
  [-21.31368, 32.44720],
  [-21.37818, 32.32452],
  [-21.54127, 32.16732],
  [-21.70446, 32.01002],
  [-21.86755, 31.85271],
  [-22.03075, 31.69551],
  [-22.19394, 31.53821],
  [-22.34504, 31.36871],
  [-22.35796, 31.25564],
  [-22.36489, 31.22154],
  [-22.35062, 31.19068],
  [-22.31641, 31.15260],
  [-22.33492, 31.09705],
  [-22.31962, 31.03612],
  [-22.28231, 30.83789],
  [-22.30856, 30.67428],
  [-22.32861, 30.62555],
  [-22.31662, 30.57217],
  [-22.31507, 30.46923],
  [-22.34349, 30.37208],
  [-22.31641, 30.26935],
  [-22.29089, 30.22170],
  [-22.29357, 30.13509],
  [-22.25709, 30.06791],
  [-22.24613, 30.03453],
  [-22.21771, 29.98378],
  [-22.19436, 29.93210],
  [-22.17244, 29.83733],
  [-22.13410, 29.69145],
  [-22.12924, 29.64106],
  [-22.14599, 29.55104],
  [-22.17007, 29.50691],
  [-22.18216, 29.39953],
  [-22.19094, 29.35695],
  [-22.11581, 29.26734],
  [-22.07571, 29.24440],
  [-22.06919, 29.10797],
  [-21.98279, 29.02157],
  [-21.87665, 29.02891],
  [-21.80999, 29.05526],
  [-21.77484, 28.98085],
  [-21.75738, 28.86085],
  [-21.65134, 28.62970],
  [-21.63656, 28.55400],
  [-21.65155, 28.49731],
  [-21.65578, 28.44310],
  [-21.59687, 28.28487],
  [-21.57785, 28.03289],
  [-21.55191, 27.99041],
  [-21.51440, 27.97057],
  [-21.51047, 27.95321],
  [-21.48205, 27.95042],
  [-21.46851, 27.94194],
  [-21.43833, 27.95021],
  [-21.35544, 27.89781],
  [-21.32433, 27.89440],
  [-21.23173, 27.82360],
  [-21.13447, 27.70919],
  [-21.05375, 27.66682],
  [-20.92353, 27.67266],
  [-20.87991, 27.67478],
  [-20.84901, 27.68904],
  [-20.71672, 27.70733],
  [-20.56613, 27.70263],
  [-20.49606, 27.68377],
  [-20.47332, 27.59085],
  [-20.47301, 27.34074],
  [-20.35147, 27.28400],
  [-20.09298, 27.20178],
  [-20.07335, 27.14189],
  [-20.07324, 27.10964],
  [-20.03738, 27.06923],
  [-20.00679, 26.99430],
  [-19.94643, 26.81188],
  [-19.93589, 26.73096],
  [-19.89455, 26.68476],
  [-19.87574, 26.65944],
  [-19.84215, 26.58192],
  [-19.78406, 26.54926],
  [-19.74334, 26.45025],
  [-19.67906, 26.38524],
  [-19.65911, 26.32437],
  [-19.64629, 26.31910],
  [-19.60495, 26.33098],
  [-19.57725, 26.30349],
  [-19.56020, 26.19445],
  [-19.24373, 26.03436],
  [-19.12209, 25.95653],
  [-19.05873, 25.94806],
  [-18.99993, 25.96745],
  [-18.73875, 25.77949],
  [-18.60873, 25.73691],
  [-18.50114, 25.62208],
  [-18.39913, 25.50850],
  [-18.32338, 25.48116],
  [-18.17600, 25.40882],
  [-18.09662, 25.32345],
  [-17.93188, 25.22609],
  [-17.79411, 25.25978]
];

const destinationIcon = L.divIcon({
  className: "leafletTourismMarker",
  html: "<span></span>",
  iconSize: [26, 26],
  iconAnchor: [13, 13]
});

const selectedDestinationIcon = L.divIcon({
  className: "leafletTourismMarker selected",
  html: "<span></span>",
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const tourismPointIcon = L.divIcon({
  className: "leafletPointMarker",
  html: "<span></span>",
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const selectedTourismPointIcon = L.divIcon({
  className: "leafletPointMarker selected",
  html: "<span></span>",
  iconSize: [26, 26],
  iconAnchor: [13, 13]
});

function MapFocus({ focusSlug }: { focusSlug: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (!focusSlug) return;
    const destination = destinations.find((item) => item.slug === focusSlug);
    if (!destination) return;

    map.flyTo([destination.coordinates.lat, destination.coordinates.lng], Math.max(map.getZoom(), 6), {
      duration: 0.65
    });
  }, [focusSlug, map]);

  return null;
}

function createGoogleMapsUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

function createDirectionsUrl(destinationLat: number, destinationLng: number) {
  return `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}`;
}

function getDistanceKm(from: { lat: number; lng: number }, to: { lat: number; lng: number }) {
  const earthRadius = 6371;
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const latDistance = toRadians(to.lat - from.lat);
  const lngDistance = toRadians(to.lng - from.lng);
  const fromLat = toRadians(from.lat);
  const toLat = toRadians(to.lat);
  const angle =
    Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);

  return earthRadius * 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1 - angle));
}

function DestinationMapPopup({ destination }: { destination: Destination }) {
  return (
    <div className="leafletDestinationPopup">
      <strong>{destination.name}</strong>
      <span>{destination.highlights.slice(0, 3).join(" / ")}</span>
      <Link className="mapPopupButton" to={`/destinations/${destination.slug}`}>
        View more
      </Link>
    </div>
  );
}

function TourismPointMapPopup({ point }: { point: TourismPoint }) {
  return (
    <div className="leafletDestinationPopup">
      <strong>{point.name}</strong>
      <span>{point.category}</span>
      <span>{point.activities.join(" / ")}</span>
      <Link className="mapPopupButton" to="/map" state={{ selectedTourismPointName: point.name }}>
        View more
      </Link>
    </div>
  );
}

interface TravelMapOverviewProps {
  title?: string;
  description?: string;
}

export function TravelMapOverview({
  title = "Zimbabwe at a glance",
  description = "Move the map, tap pins, and see what a traveller can find in each area."
}: TravelMapOverviewProps) {
  const [selectedSlug, setSelectedSlug] = useState(destinations[0].slug);
  const [selectedTourismPointName, setSelectedTourismPointName] = useState<string | null>(null);
  const [focusSlug, setFocusSlug] = useState<string | null>(null);
  const activityCount = useMemo(
    () => destinations.reduce((total, destination) => total + destination.highlights.length, 0) + tourismPoints.reduce((total, point) => total + point.activities.length, 0),
    []
  );

  return (
    <div className="realMapCard homeRealMapCard">
      <div className="resultHeader">
        <div>
          <span className="pill">Live tourism map</span>
          <h2 className="mt">{title}</h2>
          <p className="muted">{description}</p>
        </div>
      </div>
      <div className="mapQuickStats">
        <div><b>{destinations.length}</b>Main places</div>
        <div><b>{tourismPoints.length}</b>Extra points</div>
        <div><b>{activityCount}</b>Activities</div>
        <div><b>ZW</b>Border guide</div>
      </div>
      <div className="mapLegendKey">
        <div>
          <span className="legendBorder"></span>
          Zimbabwe border
        </div>
        <div>
          <span className="legendPin mainPin"><i></i></span>
          Main destination
        </div>
        <div>
          <span className="legendPin selectedPin"><i></i></span>
          Selected place
        </div>
        <div>
          <span className="legendPin pointPin"><i></i></span>
          Extra tourism point
        </div>
        <strong className="mapClickHint">Click any pin to see activities</strong>
      </div>
      <div className="realMapFrame">
        <MapContainer
          className="leafletRealMap"
          center={ZIMBABWE_CENTER}
          zoom={5.5}
          zoomSnap={0.5}
          minZoom={5}
          maxBounds={zimbabweBounds.pad(0.28)}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polygon
            positions={ZIMBABWE_BORDER}
            pathOptions={{ color: "#111", weight: 3, opacity: 0.8, fillColor: "#BE6A35", fillOpacity: 0.05, dashArray: "10 6" }}
          >
            <Tooltip sticky>Zimbabwe border</Tooltip>
          </Polygon>
          <MapFocus focusSlug={focusSlug} />
          {destinations.map((destination) => (
            <Marker
              key={destination.slug}
              position={[destination.coordinates.lat, destination.coordinates.lng]}
              icon={destination.slug === selectedSlug ? selectedDestinationIcon : destinationIcon}
              eventHandlers={{
                click: () => {
                  setSelectedSlug(destination.slug);
                  setSelectedTourismPointName(null);
                  setFocusSlug(destination.slug);
                }
              }}
            >
              <Tooltip direction="top" offset={[0, -12]} opacity={1}>
                <b>{destination.name}</b>
                <br />
                {destination.highlights.slice(0, 2).join(" / ")}
              </Tooltip>
              <Popup>
                <DestinationMapPopup destination={destination} />
              </Popup>
            </Marker>
          ))}
          {tourismPoints.map((point) => (
            <Marker
              key={point.name}
              position={[point.coordinates.lat, point.coordinates.lng]}
              icon={point.name === selectedTourismPointName ? selectedTourismPointIcon : tourismPointIcon}
              eventHandlers={{ click: () => setSelectedTourismPointName(point.name) }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <b>{point.name}</b>
                <br />
                {point.activities.slice(0, 2).join(" / ")}
              </Tooltip>
              <Popup>
                <TourismPointMapPopup point={point} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export function TravelMapPage() {
  const location = useLocation();
  const mapState = location.state as MapPageState | null;
  const initialDestinationSlug =
    mapState?.selectedDestinationSlug && destinations.some((destination) => destination.slug === mapState.selectedDestinationSlug)
      ? mapState.selectedDestinationSlug
      : destinations[0].slug;
  const initialTourismPointName =
    mapState?.selectedTourismPointName && tourismPoints.some((point) => point.name === mapState.selectedTourismPointName)
      ? mapState.selectedTourismPointName
      : null;
  const [selectedSlug, setSelectedSlug] = useState(initialDestinationSlug);
  const [selectedTourismPointName, setSelectedTourismPointName] = useState<string | null>(initialTourismPointName);
  const [focusSlug, setFocusSlug] = useState<string | null>(null);
  const selectedDestination = useMemo(
    () => destinations.find((destination) => destination.slug === selectedSlug) ?? destinations[0],
    [selectedSlug]
  );
  const selectedTourismPoint = useMemo(
    () => tourismPoints.find((point) => point.name === selectedTourismPointName) ?? null,
    [selectedTourismPointName]
  );
  const activeMapItem = selectedTourismPoint
    ? {
        type: "Extra tourism point",
        name: selectedTourismPoint.name,
        category: selectedTourismPoint.category,
        coordinates: selectedTourismPoint.coordinates,
        description: `${selectedTourismPoint.name} is an extra tourism point visitors can add around a wider Zimbabwe trip.`,
        activities: selectedTourismPoint.activities,
        arrivalHub: "Use the nearest town, lodge, park office or local guide pickup point.",
        travelNote: "Check road conditions, opening times and local guidance before adding this stop."
      }
    : {
        type: "Main destination",
        name: selectedDestination.name,
        category: selectedDestination.category,
        coordinates: selectedDestination.coordinates,
        description: selectedDestination.mapNote,
        activities: selectedDestination.highlights,
        arrivalHub: selectedDestination.nearestArrivalHub,
        travelNote: selectedDestination.driveTimeFromHarare
      };
  const activityCount = useMemo(
    () => destinations.reduce((total, destination) => total + destination.highlights.length, 0) + tourismPoints.reduce((total, point) => total + point.activities.length, 0),
    []
  );
  const nearbyDestinations = useMemo(
    () =>
      destinations
        .filter((destination) => selectedTourismPoint || destination.slug !== selectedDestination.slug)
        .map((destination) => ({
          destination,
          distance: getDistanceKm(activeMapItem.coordinates, destination.coordinates)
        }))
        .sort((left, right) => left.distance - right.distance)
        .slice(0, 3),
    [activeMapItem.coordinates, selectedDestination.slug, selectedTourismPoint]
  );
  const nearbyTourismPoints = useMemo(
    () =>
      tourismPoints
        .filter((point) => point.name !== selectedTourismPoint?.name)
        .map((point) => ({
          point,
          distance: getDistanceKm(activeMapItem.coordinates, point.coordinates)
        }))
        .sort((left, right) => left.distance - right.distance)
        .slice(0, 4),
    [activeMapItem.coordinates, selectedTourismPoint]
  );

  useEffect(() => {
    if (mapState?.selectedDestinationSlug && destinations.some((destination) => destination.slug === mapState.selectedDestinationSlug)) {
      setSelectedSlug(mapState.selectedDestinationSlug);
      setSelectedTourismPointName(null);
      setFocusSlug(mapState.selectedDestinationSlug);
    }

    if (mapState?.selectedTourismPointName && tourismPoints.some((point) => point.name === mapState.selectedTourismPointName)) {
      setSelectedTourismPointName(mapState.selectedTourismPointName);
    }
  }, [mapState?.selectedDestinationSlug, mapState?.selectedTourismPointName]);

  return (
    <section className="section pageTop">
      <div className="container">
        <div className="pageIntro">
          <span className="pill">Travel Map</span>
          <h1>Discover Zimbabwe on the map.</h1>
          <p className="lead">
            Explore main destinations, nearby tourism points and activities across Zimbabwe in one simple map view.
          </p>
        </div>

        <div className="mapLayout">
          <div className="mapPanel">
            <div className="realMapCard">
              <div className="resultHeader">
                <div>
                  <span className="pill">Live tourism map</span>
                  <h2 className="mt">Zimbabwe at a glance</h2>
                  <p className="muted">Move the map, tap pins, and see what a traveller can find in each area.</p>
                </div>
              </div>
              <div className="mapQuickStats">
                <div><b>{destinations.length}</b>Main places</div>
                <div><b>{tourismPoints.length}</b>Extra points</div>
                <div><b>{activityCount}</b>Activities</div>
                <div><b>ZW</b>Border guide</div>
              </div>
              <div className="mapLegendKey">
                <div>
                  <span className="legendBorder"></span>
                  Zimbabwe border
                </div>
                <div>
                  <span className="legendPin mainPin"><i></i></span>
                  Main destination
                </div>
                <div>
                  <span className="legendPin selectedPin"><i></i></span>
                  Selected place
                </div>
                <div>
                  <span className="legendPin pointPin"><i></i></span>
                  Extra tourism point
                </div>
                <strong className="mapClickHint">Click any pin to see activities</strong>
              </div>
              <div className="realMapFrame">
                <MapContainer
                  className="leafletRealMap"
                  center={ZIMBABWE_CENTER}
                  zoom={5.5}
                  zoomSnap={0.5}
                  minZoom={5}
                  maxBounds={zimbabweBounds.pad(0.28)}
                  scrollWheelZoom
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Polygon
                    positions={ZIMBABWE_BORDER}
                    pathOptions={{ color: "#111", weight: 3, opacity: 0.8, fillColor: "#BE6A35", fillOpacity: 0.05, dashArray: "10 6" }}
                  >
                    <Tooltip sticky>Zimbabwe border</Tooltip>
                  </Polygon>
                  <MapFocus focusSlug={focusSlug} />
                  {destinations.map((destination) => {
                    const icon = destination.slug === selectedSlug ? selectedDestinationIcon : destinationIcon;

                    return (
                      <Marker
                        key={destination.slug}
                        position={[destination.coordinates.lat, destination.coordinates.lng]}
                        icon={icon}
                        eventHandlers={{
                          click: () => {
                            setSelectedSlug(destination.slug);
                            setSelectedTourismPointName(null);
                            setFocusSlug(destination.slug);
                          }
                        }}
                      >
                        <Tooltip direction="top" offset={[0, -12]} opacity={1}>
                          <b>{destination.name}</b>
                          <br />
                          {destination.highlights.slice(0, 2).join(" / ")}
                        </Tooltip>
                        <Popup>
                          <DestinationMapPopup destination={destination} />
                        </Popup>
                      </Marker>
                    );
                  })}
                  {tourismPoints.map((point) => (
                    <Marker
                      key={point.name}
                      position={[point.coordinates.lat, point.coordinates.lng]}
                      icon={point.name === selectedTourismPointName ? selectedTourismPointIcon : tourismPointIcon}
                      eventHandlers={{ click: () => setSelectedTourismPointName(point.name) }}
                    >
                      <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                        <b>{point.name}</b>
                        <br />
                        {point.activities.slice(0, 2).join(" / ")}
                      </Tooltip>
                      <Popup>
                        <TourismPointMapPopup point={point} />
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>

          <aside className="panel mapDetails">
            <span className="pill">{activeMapItem.type}</span>
            <h2 className="mt">{activeMapItem.name}</h2>
            <p className="muted">{activeMapItem.description}</p>

            <div className="routeInfo">
              <p><b>Category:</b> {activeMapItem.category}</p>
              <p><b>Arrival guidance:</b> {activeMapItem.arrivalHub}</p>
              <p><b>Travel note:</b> {activeMapItem.travelNote}</p>
            </div>

            <div className="mapButtonRow">
              <a
                className="button"
                href={createDirectionsUrl(activeMapItem.coordinates.lat, activeMapItem.coordinates.lng)}
                target="_blank"
                rel="noreferrer"
              >
                <Navigation size={16} />
                Directions
              </a>
              <a
                className="button secondary"
                href={createGoogleMapsUrl(activeMapItem.coordinates.lat, activeMapItem.coordinates.lng)}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={16} />
                Open map
              </a>
            </div>

            <div className="itineraryCard">
              <strong>Activities here</strong>
              <div className="quickToolsRow" style={{ marginTop: 12 }}>
                {activeMapItem.activities.map((highlight) => (
                  <span className="toolPill" key={highlight}>{highlight}</span>
                ))}
              </div>
            </div>

            <div className="itineraryCard">
              <strong>Nearby tourism places</strong>
              <div className="routeInfo">
                {nearbyDestinations.map(({ destination, distance }) => (
                  <p key={destination.slug}>
                    <b>{destination.name}:</b> about {Math.round(distance)} km away / {destination.highlights.slice(0, 2).join(", ")}
                  </p>
                ))}
                {nearbyTourismPoints.map(({ point, distance }) => (
                  <p key={point.name}>
                    <b>{point.name}:</b> about {Math.round(distance)} km away / {point.activities.slice(0, 2).join(", ")}
                  </p>
                ))}
              </div>
            </div>

            <details className="itineraryCard">
              <summary>Map coordinates</summary>
              <div className="gpsGrid">
                <div className="budget">
                  <b>{activeMapItem.coordinates.lat.toFixed(4)}</b>
                  Latitude
                </div>
                <div className="budget">
                  <b>{activeMapItem.coordinates.lng.toFixed(4)}</b>
                  Longitude
                </div>
              </div>
              <p className="muted">
                These coordinates help identify the selected destination on the map.
              </p>
            </details>
          </aside>
        </div>
      </div>
    </section>
  );
}
