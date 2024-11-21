export interface User {
  id: number;
  login: string;
  admin: boolean;
  id_client: number;
}

export interface Article {
  id: number;
  code: string;
  libelle: string;
  famille: string;
  url_image: string;
}

export interface Client {
  id: number;
  code: string;
  nom: string;
  adresse1: string;
  adresse2?: string;
  adresse3?: string;
  code_postal: string;
  ville: string;
  pays: string;
}

export interface OrderHeader {
  id: number;
  id_client: number;
  date: string;
  date_livraison: string;
  numero: string;
  numero_cde_client: string;
}

export interface OrderLine {
  id: number;
  id_entete_commande: number;
  id_article: number;
  quantite: number;
}

export interface CartItem {
  article: Article;
  quantity: number;
}