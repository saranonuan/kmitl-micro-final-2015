<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
    {
        $students = array(
            "54070010","54070026",
            "54070069","54070074",
            "54070080","55070001",
            "55070006","55070010",
            "55070015","55070022",
            "55070031","55070038",
            "55070047","55070049",
            "55070050","55070051",
            "55070056","55070059",
            "55070060","55070063",
            "55070064","55070072",
            "55070075","55070076",
            "55070078","55070082",
            "55070084","55070088",
            "55070091","55070101",
            "55070102","55070103",
            "55070104","55070105",
            "55070108","55070110",
            "55070117","55070119",
            "55070121","55070122",
            "55070127","55070129",
            "55070142"
        );
		return view('dashboard.index', array("students" => $students));
	}

}
