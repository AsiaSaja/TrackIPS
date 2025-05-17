<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\MapWifiResources;
use App\Http\Resources\RoomResources;
use App\Http\Resources\SearchResources;
use App\Http\Resources\UserDetail;
use App\Http\Resources\UserResources;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Room;

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
}
