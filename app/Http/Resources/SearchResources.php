<?php

namespace App\Http\Resources;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SearchResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $room = $this->wifi == null ? null : $this->wifi->room;
        return [
            'name' => $this->name,
            'status' => $this->status,
            'room' => $room == null ? 'Tidak Ditemukan' : Room::find($room)->name,
        ];
    }
}
