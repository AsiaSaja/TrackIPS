<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    function login(Request $request){
        $validated = Validator::make($request->all(),[
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if($validated->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Validasi Gagal',
                'errors' => $validated->errors()
            ],401);
        }

         $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = \App\Models\User::where('email', $request->email)->first();

            $access_token = $user->createToken('access_token',['access-api'],Carbon::now()->addDays(7))->plainTextToken;
            $refresh_token = $user->createToken('refresh_token',['issue-access-token'],Carbon::now()->addDays(30))->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => 'Login Berhasil',
                'data' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'access_token' => $access_token,
                    'refresh_token' => $refresh_token,
                ]
            ],200);
        }

        return response()->json([
            'status' => false,
            'message' => 'Login Gagal'
        ],401);
    }

    function register(Request $request){
        $validated = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
        
        if($validated->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Validasi Gagal',
                'errors' => $validated->errors()
            ],401);
        }

        $user = \App\Models\User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
        ]);

        $access_token = $user->createToken('access_token',['access-api'],Carbon::now()->addDays(7))->plainTextToken;
        $refresh_token = $user->createToken('refresh_token',['issue-access-token'],Carbon::now()->addDays(30))->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Data Berhasil Terdaftar',
            'data' => [
                'name' => $user->name,
                'email' => $user->email,
                'access_token' => $access_token,
                'refresh_token' => $refresh_token,
            ]
        ],200);

        // Auth::login($user);

        // return redirect('/home');
    }

    function refreshToken(Request $request){
        $access_token = $request->user()->createToken('access_token',['access-api'],Carbon::now()->addDays(7))->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Token Refreshed',
            'data' => [
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'access_token' => $access_token,
            ]
        ],200);
    }

    function logout(Request $request){
        
        $request->user()->tokens()->delete();
        return response()->json([
            'status' => true,
            'message' => 'Logout Berhasil',
        ],200);
    }
}
