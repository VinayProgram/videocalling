import { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [roomid, setRoomid] = useState(Math.floor(Math.random() * 5));

  return (
    <div>
      <div
        style={{
          height: "90vh",
          width: "98vw",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div class="card my-5" style={{ backgroundColor: "#212529" }}>
          <img
            src="https://media.istockphoto.com/id/1421069267/vector/young-couple-sit-at-cafe-table-and-talking-or-chatting-black-man-and-woman-on-romantic-date.jpg?s=170667a&w=is&k=20&c=0tGrNgJij-1oWVtcI6SKIZQJTmgQ4r-cLiGlFQsXyGY="
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 style={{ textAlign: "center", color: "white" }}>
              Enter The Roomid
            </h5>

            <input
              type="text"
              class="form-control my-2"
              placeholder="RoomId"
              aria-label="RoomId"
              onChange={(e) => {
                setRoomid(e.target.value);
              }}
            />

            <Link to={"RoomID/" + roomid} class="btn btn-primary my-2">
              Join Room
            </Link>
          </div>
        </div>
        <div class="card my-5" style={{ backgroundColor: "#212529" }}>
          <img
            src="https://media.istockphoto.com/id/1347744566/vector/friends-sitting-in-room.jpg?s=612x612&w=0&k=20&c=8p-VRiqiKF6QFYxEBMeWd6CsVnsVIhLkS5YZBH7LC_I="
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title" style={{ color: "white" }}>
              Random Chat
            </h5>
            <br />
            <Link to={"RandomRoom/" + roomid} class="btn btn-warning my-2">
              Lets Have fun
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
