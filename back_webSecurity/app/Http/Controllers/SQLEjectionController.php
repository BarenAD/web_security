<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SQLEjection;
use App\Facades\WorkerTokensFacade;

class SQLEjectionController extends Controller
{
    private function getUser($inToken)
    {
        return WorkerTokensFacade::getUserByToken(
            WorkerTokensFacade::parseBearerToToken($inToken)
        );
    }

    public function create(Request $request)
    {
        $user = $this->getUser($request->header('Authorization'));
        $text = $request->input('text');
        if (isset($text)) {
            $result = SQLEjection::create([
                'text' => $text,
                'created_name_user' => "" . $user->first_name . " " . $user->last_name,
            ]);
            return response()->json($result,200);
        }
        return response()->json('Не прислан текст или его длина меньше 5 символов',500);
    }

    public function getAll(Request $request)
    {
        $created_name_user = $request->input('created_name_user');
        $result = SQLEjection::where('created_name_user','like',$created_name_user)->cursor();
        return response()->json($result,200);
    }

    public function delete(Request $request)
    {
        $result = SQLEjection::where('id', (int) $request->input('id'))->delete();
        return response()->json($result,200);
    }
}
