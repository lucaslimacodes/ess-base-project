import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, PrimaryColumn, JoinTable} from "typeorm";
import User from "./user.entity";
import Category from "./category.entity";
import Song from "./songs.entity";

@Entity()
class Playlist{

    @PrimaryGeneratedColumn()
    playlistID:number

    @Column()
    name:string
    
    @ManyToOne(() => User, (user) => user.playlists, {nullable:false})
    user:User

    @Column()
    description: string

    @Column({nullable:false})
    saveCount: number

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[]

    @ManyToMany(() => Song)
    @JoinTable()
    songs: Song[]
    
}

export default Playlist