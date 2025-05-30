<?php

namespace App\Http\Controllers\API;

use App\Events\UpdateUserLocation;
use App\Http\Controllers\Controller;
use App\Http\Resources\MapWifiResources;
use App\Http\Resources\RoomResources;
use App\Http\Resources\SearchResources;
use App\Http\Resources\UserDetail;
use App\Http\Resources\UserResources;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Room;
use App\Models\Wifi;

class MapController extends Controller
{
    function map($floor){
        $user = MapWifiResources::collection(Room::where('floor',$floor)->first()->wifis);
        $room = RoomResources::collection(Room::where('floor',$floor)->get());
        return response()->json([
            'status' => true,
            'message' => 'Map Resources',
            'data' => [
                'room' => $room,
                'user' => $user,
            ]
        ],200);
    }

    function userInRoom($room){
        $room = Room::where('name',$room)->first();
        // dd($room->id);
        // dd(User::all(),Wifi::where('room',$room->id)->first()->users);
        $users = UserResources::collection(Wifi::where('room',$room->id)->first()->users);

        return response()->json([
            'status' => true,
            'message' => 'Map Resources',
            'data' => [
                'user' => $users,
            ]
        ],200);
    }
    
    function userDetail($id){
        $json = new UserDetail(User::find($id));

        return response()->json([
            'status' => true,
            'message' => 'User Detail',
            'data' => $json
        ],200);
    }

    function search($name){
        $json = SearchResources::collection(User::whereLike('name','%'.$name.'%')->get());

        return response()->json([
            'status' => true,
            'message' => 'Search',
            'data' => $json
        ],200);
    }

    function changeLocation(Request $request,$wifi){
        $new = $request->user();
        $new->BSSID = $wifi;
        $new->save();
        
        broadcast(new UpdateUserLocation($new));

        return response()->json([
            'status' => true,
            'message' => 'Change Location',
        ],200);
    }
}
